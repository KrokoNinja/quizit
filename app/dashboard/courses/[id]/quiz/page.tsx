import QuizBox from "@/components/QuizBox"
import SinglePageWrapper from "@/components/SinglePageWrapper"

const page = ({ params } : {params: {id: string}}) => {
  return (
    <SinglePageWrapper>
      <h1>Quiz</h1>
      <div>
        <QuizBox courseId={params.id} />
      </div>
    </SinglePageWrapper>
  )
}

export default page