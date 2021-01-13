import {
  useState,
  useEffect,
  createContext,
  Fragment,
  useCallback,
} from "react";
import { PageHeader } from "@/components/PageHeader";
import clsx from "clsx";

export const ContentsContext = createContext();

function TableOfContents({ tableOfContents, currentSection }) {
  return (
    <>
      <ul className="overflow-x-hidden text-gray-500 font-medium">
        {tableOfContents.map((section) => {
          let sectionIsActive =
            currentSection === section.slug ||
            section.children.findIndex(({ slug }) => slug === currentSection) >
              -1;

          return (
            <Fragment key={section.slug}>
              <li>
                <a
                  href={`#${section.slug}`}
                  className={clsx(
                    "block py-2 transition-colors duration-200 text-gray-900 hover:text-primary font-medium",
                    {
                      "text-primary": sectionIsActive,
                    }
                  )}
                >
                  {section.title}
                </a>
              </li>
              {section.children.map((subsection) => {
                let subsectionIsActive = currentSection === subsection.slug;

                return (
                  <li className="ml-2" key={subsection.slug}>
                    <a
                      href={`#${subsection.slug}`}
                      className={clsx(
                        "block py-2 transition-colors duration-200 text-gray-900 hover:text-primary font-medium",
                        {
                          "text-primary": subsectionIsActive,
                        }
                      )}
                    >
                      {subsection.title}
                    </a>
                  </li>
                );
              })}
            </Fragment>
          );
        })}
      </ul>
    </>
  );
}

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.slug);
  let [headings, setHeadings] = useState([]);

  const registerHeading = useCallback((id, top) => {
    setHeadings((headings) => [
      ...headings.filter((h) => id !== h.id),
      { id, top },
    ]);
  }, []);

  const unregisterHeading = useCallback((id) => {
    setHeadings((headings) => headings.filter((h) => id !== h.id));
  }, []);

  useEffect(() => {
    if (tableOfContents.length === 0 || headings.length === 0) return;
    function onScroll() {
      let y = window.pageYOffset;
      let windowHeight = window.innerHeight;
      let sortedHeadings = headings.concat([]).sort((a, b) => a.top - b.top);
      if (y <= 0) {
        setCurrentSection(sortedHeadings[0].id);
        return;
      }
      if (y + windowHeight >= document.body.scrollHeight) {
        setCurrentSection(sortedHeadings[sortedHeadings.length - 1].id);
        return;
      }
      const middle = y + windowHeight / 2;
      let current = sortedHeadings[0].id;
      for (let i = 0; i < sortedHeadings.length; i++) {
        if (middle >= sortedHeadings[i].top) {
          current = sortedHeadings[i].id;
        }
      }
      setCurrentSection(current);
    }
    window.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [headings, tableOfContents]);

  return { currentSection, registerHeading, unregisterHeading };
}

export function WithSidebarLayout({
  children,
  meta = {},
  classes,
  tableOfContents = [],
}) {
  const toc = [
    ...(classes
      ? [
          {
            title: "Default class reference",
            slug: "class-reference",
            children: [],
          },
        ]
      : []),
    ...tableOfContents,
  ];

  const {
    currentSection,
    registerHeading,
    unregisterHeading,
  } = useTableOfContents(toc);
  return (
    <div>
      <div id={meta.containerId} className="w-full flex">
        {toc.length > 0 && (
          <div className="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8 bg-gray-100">
            <div className="overflow-y-auto sticky top-20">
              <TableOfContents
                tableOfContents={toc}
                currentSection={currentSection}
              />
            </div>
          </div>
        )}
        <div className="max-w-none prose min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
          {meta.title && (
            <PageHeader title={meta.title} description={meta.description} />
          )}
          <ContentsContext.Provider
            value={{ registerHeading, unregisterHeading }}
          >
            {children}
          </ContentsContext.Provider>
        </div>
      </div>
    </div>
  );
}
