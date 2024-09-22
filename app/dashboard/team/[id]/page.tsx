const page = ({params} : {params: {id: string}}) => {
  return (
    <div>Team #{params.id}</div>
  )
}

export default page