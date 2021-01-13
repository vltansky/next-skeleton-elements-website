import slugify from "@sindresorhus/slugify";
import { Heading } from "@/components/heading";
import { WithSidebarLayout } from "@/layouts/withSidebar";

export async function getStaticProps() {
  const context = require.context("./", false, /\.js$/);
  const demos = [];
  for (const key of context.keys()) {
    const demo = key.slice(2);
    const { meta } = await import(`./${demo}`);
    if (meta && meta.title) {
      const { title } = meta;
      demos.push({
        title: title,
        slug: slugify(title),
      });
    }
  }
  return {
    props: {
      demos,
    },
  };
}
let tableOfContents;
export default function IndexPage({ demos }) {
  tableOfContents = demos.map(({ title, slug }) => {
    return {
      title,
      slug: slug,
      children: [],
    };
  });
  return (
    <WithSidebarLayout tableOfContents={tableOfContents}>
      {demos.map(({ title, slug }) => (
        <Heading key={title} level={2} id={slug} toc={true}>
          {title}
        </Heading>
      ))}
    </WithSidebarLayout>
  );
}

const meta = {
  title: "Swiper demos",
};

IndexPage.layoutProps = {
  WithSidebarLayout,
  meta,
  tableOfContents,
};
