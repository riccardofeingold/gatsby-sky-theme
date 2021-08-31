import React, {useState, useEffect} from 'react'

const useHeadingsData = () => {
    const [nestedHeadings, setNestedHeadings] = useState([]);
  
    useEffect(() => {
      const content = document.querySelector("article")
      const headingElements = Array.from(
        content.querySelectorAll("h2, h3")
      );
  
      const newNestedHeadings = getNestedHeadings(headingElements);
      setNestedHeadings(newNestedHeadings);
    }, []);
  
    return { nestedHeadings };
};

const getNestedHeadings = (headingElements) => {
    const nestedHeadings = [];
  
    headingElements.forEach((heading, index) => {
      const { innerText: title, id } = heading;
  
      if (heading.nodeName === "H2") {
        nestedHeadings.push({ id, title, items: [] });
      } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title,
        });
      }
    });
  
    return nestedHeadings;
  };

const Headings = ({ headings }) => (
    <ul>
      {headings.map((heading) => (
        <li key={heading.id}>
          <a 
            href={`#${heading.id}`}
            onClick={(e) => {
                e.preventDefault();
                document.getElementById(`${heading.id}`).scrollIntoView({
                    behavior: "smooth"
                });
            }}
            style={{color: `#8B91A7`}}
          >{heading.title}</a>
          {heading.items.length > 0 && (
                <ul> 
                    {heading.items.map((child) => (
                        <li key={child.id}>                
                            <a 
                                href={`#${child.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector(`#${child.id}`).scrollIntoView({
                                        behavior: "smooth"
                                    });
                                }}
                                style={{color: `#8B91A7`}}
                            >{child.title}</a>              
                        </li>
                    ))}
                </ul>
            )}
        </li>
      ))}
    </ul>
  );
  
const TableOfContents = () => {
    const { nestedHeadings } = useHeadingsData();

    return (
        <div className={`container post-full-content ${nestedHeadings.length > 0 ? "p-2" : ""}`} aria-label="Table of contents">
            {
                nestedHeadings.length > 0 ? <h2>Table Of Contents</h2> : null
            }
            <Headings headings={nestedHeadings} />
        </div>
    );
};

export default TableOfContents;