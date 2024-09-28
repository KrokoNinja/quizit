import SinglePageWrapper from "@/components/SinglePageWrapper"

const page = ({params} : {params: {id: string}}) => {
  return (
    <SinglePageWrapper>
      <h1>Team Page</h1>
      <p>Team ID: {params.id}</p>
    </SinglePageWrapper>
  )
}

export default page