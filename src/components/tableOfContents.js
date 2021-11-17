import React, {useState, useEffect} from 'react'

const generateRandomNumber = (min, max) =>  {
  return Math.floor(Math.random() * (max - min) + min);
};

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
  
    headingElements.forEach((heading) => {
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
    <ul style={{listStyleType: `none`, borderLeft: `3px solid #007bffb5`, paddingLeft: `1rem`}}>
      {headings.map((heading) => (
        <li key={heading.id} style={{padding: `0.25rem`}}>
          <a 
            href={`#${heading.id}`}
            onClick={(e) => {
                e.preventDefault();
                document.getElementById(`${heading.id}`).scrollIntoView({
                    behavior: "smooth"
                });
            }}
            className="fw-bold"
            style={{color: `#454e6b`, textDecoration: `underline`, textDecorationColor: `rgb(${generateRandomNumber(0, 255)}, ${generateRandomNumber(0, 255)}, ${generateRandomNumber(0, 255)}, 0.3)`}}
          >{heading.title}</a>
          {heading.items.length > 0 && (
                <ul style={{listStyleType: `none`}}> 
                    {heading.items.map((child) => (
                        <li key={child.id} style={{padding: `0.25rem`}}>                
                            <a 
                                href={`#${child.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector(`#${child.id}`).scrollIntoView({
                                        behavior: "smooth"
                                    });
                                }}
                                style={{color: `#454e6b`}}
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
        <div className={`container post-full-content ${nestedHeadings.length > 0 ? "py-3 mb-4" : ""}`} style={{backgroundColor: `#F8FAFC`, borderRadius: `10px`}} aria-label="Table of contents">
            {
                nestedHeadings.length > 0 ? <h3>Table Of Contents</h3> : null
            }
            <Headings headings={nestedHeadings} />
        </div>
    );
};

export default TableOfContents;