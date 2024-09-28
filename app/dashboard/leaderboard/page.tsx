import SinglePageWrapper from '@/components/SinglePageWrapper';
import SoloLeaderboard from '@/components/SoloLeaderboard';
import TeamLeaderboard from '@/components/TeamLeaderboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const page = () => {
  return (
    <SinglePageWrapper>
      <div className="mx-auto max-w-4xl p-4">
        <h1 className="mb-8 text-center text-3xl font-bold">Leaderboard</h1>
        <Tabs defaultValue="solo">
          <TabsList className="w-full">
            <TabsTrigger value="solo" className="w-full">
              Solo
            </TabsTrigger>
            <TabsTrigger value="team" className="w-full">
              Team
            </TabsTrigger>
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
  );
};

export default page;
