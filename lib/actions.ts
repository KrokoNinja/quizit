'use server';
import { getIronSession } from 'iron-session';
import { defaultSession, SessionData, sessionOptions } from './utils';
import { cookies } from 'next/headers';
import prisma from './db';
import { redirect } from 'next/navigation';
import { validateEmail, validatePassword } from './helpers';
import { revalidatePath } from 'next/cache';

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const login = async (
  prevState: { error: undefined | string },
  formData: FormData,
) => {
  const session = await getSession();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      error: 'No user found in database. Please sign up.',
    };
  }

  const isCorrectPassword = password === user.password;

  if (!isCorrectPassword) {
    return {
      error: 'Invalid credentials',
    };
  }

  session.userId = user.id;
  session.isLoggedIn = true;
  session.email = user.email;
  session.isAdmin = user.isAdmin;
  session.username = user.username;
  session.team = user.teamId || '';

  await session.save();
  redirect('/dashboard');
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect(`/login`);
};

export const signup = async (
  prevState: { error: undefined | string },
  formData: FormData,
) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!validateEmail(email)) {
    return {
      error: 'Invalid email',
    };
  } else if (!validatePassword(password)) {
    return {
      error:
        'Password must be at least 8 characters long, contain a number, a lowercase letter, an uppercase letter and a special character',
    };
  }

  const alreadySignedUp = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (alreadySignedUp) {
    return {
      error: 'User already exists. Please login.',
    };
  }

  let isAdmin = false;
  let adminMails: string[] = [];

  if (process.env.ADMIN_EMAILS) {
    adminMails = process.env.ADMIN_EMAILS!.split(',');
    isAdmin = adminMails.includes(email);
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: password,
      username: Math.random().toString(36).substring(7),
    },
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      username: `user-${user.id}`,
      isAdmin,
    },
  });

  redirect('/login');
};

export const updateUsername = async (
  prevState: { error: undefined | string },
  formData: FormData,
) => {
  const session = await getSession();

  const username = formData.get('username') as string;

  const isUsernameTaken = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (isUsernameTaken) {
    return {
      error: 'Username already taken',
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session.userId,
      },
      data: {
        username,
      },
    });
    session.username = username;
    session.save();
    return {
      state: 'Username updated',
    };
  } catch (error) {
    return {
      state: 'Failed to update username',
    };
  }
};

export const approveQuestion = async (formData: FormData) => {
  const id = formData.get('id') as string;

  await prisma.question.update({
    where: {
      id,
    },
    data: {
      published: true,
    },
  });
  revalidatePath('/dashboard/questions');
};

export const deleteQuestion = async (
  prevState: { error: undefined | string },
  formData: FormData,
) => {
  const id = formData.get('id') as string;

  try {
    await prisma.question.delete({
      where: {
        id,
      },
    });
    return {
      state: 'Question deleted',
    };
  } catch (error) {
    return {
      error: 'Failed to delete question. Please try again.',
    };
  }
};

export const requestQuestion = async (
  prevState: { error: undefined | string },
  formData: FormData,
) => {
  const question = formData.get('question') as string;
  const choice1 = formData.get('choice1') as string;
  const choice2 = formData.get('choice2') as string;
  const choice3 = formData.get('choice3') as string;
  const choice4 = formData.get('choice4') as string;
  const choice5 = formData.get('choice5') as string;
  const choice1Correct = formData.get('choice1Correct') === 'true';
  const choice2Correct = formData.get('choice2Correct') === 'true';
  const choice3Correct = formData.get('choice3Correct') === 'true';
  const choice4Correct = formData.get('choice4Correct') === 'true';
  const choice5Correct = formData.get('choice5Correct') === 'true';

  const courseId = formData.get('course') as string;

  const session = await getSession();

  const isTutor = await prisma.user.findFirst({
    where: {
      id: session.userId,
      tutorOfCourse: {
        some: {
          id: courseId,
        },
      },
    },
  });

  if (
    !choice1Correct &&
    !choice2Correct &&
    !choice3Correct &&
    !choice4Correct &&
    !choice5Correct
  ) {
    return {
      error: 'Please select at least one correct answer',
    };
  }

  if (!courseId) {
    return {
      error: 'Please select a course',
    };
  }

  try {
    await prisma.question.create({
      data: {
        question,
        choice1,
        choice2,
        choice3,
        choice4,
        choice5,
        choice1Correct,
        choice2Correct,
        choice3Correct,
        choice4Correct,
        choice5Correct,
        courseId,
        published: session.isAdmin || isTutor ? true : false,
      },
    });
    //the revalidation only works on the courses page now
    return {
      success: 'Question created',
    };
  } catch (error) {
    return {
      error: 'Failed to create question. Please try again.',
    };
  }
};

export const editQuestion = async (
  prevState: { error: undefined | string },
  formData: FormData,
) => {
  const id = formData.get('id') as string;
  const question = formData.get('question') as string;
  const choice1 = formData.get('choice1') as string;
  const choice2 = formData.get('choice2') as string;
  const choice3 = formData.get('choice3') as string;
  const choice4 = formData.get('choice4') as string;
  const choice5 = formData.get('choice5') as string;
  const choice1Correct = formData.get('choice1Correct') == 'true';
  const choice2Correct = formData.get('choice2Correct') == 'true';
  const choice3Correct = formData.get('choice3Correct') == 'true';
  const choice4Correct = formData.get('choice4Correct') == 'true';
  const choice5Correct = formData.get('choice5Correct') == 'true';
  const courseId = formData.get('course') as string;

  if (
    !choice1Correct &&
    !choice2Correct &&
    !choice3Correct &&
    !choice4Correct &&
    !choice5Correct
  ) {
    return {
      error: 'Please select at least one correct answer',
    };
  }

  if (!courseId) {
    return {
      error: 'Please select a course',
    };
  }

  try {
    await prisma.question.update({
      where: {
        id,
      },
      data: {
        question,
        choice1,
        choice2,
        choice3,
        choice4,
        choice5,
        choice1Correct,
        choice2Correct,
        choice3Correct,
        choice4Correct,
        choice5Correct,
        courseId,
      },
    });
    revalidatePath(`/dashboard/questions/${id}`);
    return {
      success: 'Question edited',
    };
  } catch (error) {
    return {
      error: 'Failed to edit question. Please try again.',
    };
  }
};

export const getQuizQuestions = async (courseId: string) => {
  const questions = await prisma.question.findMany({
    where: {
      courseId,
      published: true,
    },
  });

  // get 3 random questions
  return questions.sort(() => Math.random() - Math.random()).slice(0, 3);
};

export const createTeam = async (
  prevState: { error: undefined | string },
  formData: FormData,
) => {
  const name = formData.get('name') as string;
  const nameExists = await prisma.team.findFirst({
    where: {
      name,
    },
  });

  if (nameExists) {
    return {
      error: 'Team name already exists',
    };
  }

  if (!name) {
    return {
      error: 'Please enter a team name',
    };
  }

  const session = await getSession();

  try {
    await prisma.team.create({
      data: {
        name,
        users: {
          connect: {
            id: session.userId,
          },
        },
      },
    });
  } catch (error) {
    return {
      error: 'Failed to create team. Please try again.',
    };
  }
  const userTeam = await prisma.team.findFirst({
    where: {
      name,
    },
  });
  if (!userTeam) {
    return {
      erro: 'Something went wrong. Please try again.',
    };
  }
  session.team = userTeam.id;
  await session.save();
  redirect(`/dashboard/team/${session.team}`);
};

export const createCourse = async (
  prevState: { error: string | undefined },
  formData: FormData,
) => {
  const name = formData.get('name') as string;
  const abbreviation = formData.get('abbreviation') as string;
  const tutorId = formData.get('tutor') as string;
  const tutor = await prisma.user.findFirst({
    where: {
      id: tutorId,
    },
  });

  if (!tutor) {
    return {
      error: 'There was a problem, please try again.',
    };
  }

  const nameExists = await prisma.course.findFirst({
    where: {
      name,
    },
  });

  if (nameExists) {
    return {
      error: 'Course name already exists',
    };
  }

  if (!name || !abbreviation) {
    return {
      error: 'Please enter a course name and abbreviation',
    };
  }

  try {
    await prisma.course.create({
      data: {
        name,
        abbreviation,
        tutorId,
      },
    });
    await prisma.user.update({
      where: {
        id: tutorId,
      },
      data: {
        isTutor: true,
      },
    });
    revalidatePath('/dashboard/courses');
    return {
      success: 'Course created',
    };
  } catch (error) {
    return {
      error: 'Failed to create course. Please try again.',
    };
  }
};

export const joinTeam = async (teamId: string, userId: string) => {
  const session = await getSession();
  const team = await prisma.team.findFirst({
    where: {
      id: teamId,
    },
    select: {
      _count: {
        select: {
          users: true,
        },
      },
    },
  });

  if (!team) {
    return {
      error: 'Team does not exist',
    };
  }

  if (team._count.users >= 5) {
    return {
      error: 'Team is full',
    };
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      teamId,
    },
  });

  session.team = teamId;
  await session.save();
  revalidatePath(`/dashboard/team/`);

  return {
    success: 'Joined team',
  };
};

export const getTeam = async (teamId: string) => {
  const team = await prisma.team.findFirst({
    where: {
      id: teamId,
    },
    include: {
      users: {
        select: {
          username: true,
          isAdmin: true,
          isTutor: true,
        },
      },
    },
  });

  return team;
};
