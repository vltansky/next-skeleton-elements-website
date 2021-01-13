import { WithSidebarLayout } from "../layouts/withSidebar";
export default function Home() {
  return (
    <WithSidebarLayout>
      <div className="home-header">
        <h1>Skeleton Elements</h1>
        <h2>UI for improved perceived performance</h2>
      </div>
    </WithSidebarLayout>
  );
}
