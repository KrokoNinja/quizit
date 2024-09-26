import SinglePageWrapper from '@/components/SinglePageWrapper';
import SoloLeaderboard from '@/components/SoloLeaderboard';
import TeamLeaderboard from '@/components/TeamLeaderboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const page = () => {

  return (
    <SinglePageWrapper>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Leaderboard</h1>
        <Tabs defaultValue="solo">
          <TabsList>
            <TabsTrigger value="solo">Solo</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="solo">
            <SoloLeaderboard />
          </TabsContent>
          <TabsContent value="team">
            <TeamLeaderboard />
          </TabsContent>
        </Tabs>
      </div>
    </SinglePageWrapper>
  )
}

export default page;