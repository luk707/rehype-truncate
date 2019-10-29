import unified from "unified";
import html from "rehype-parse";
import rehypeTruncate from "./index";
import stringify from "rehype-stringify";

const exampleDocument1 = `
  <html>
    <head></head>
    <body>
      <h1>Hello, World.</h1>
      <p>This is an example document to test html truncation.</p>
    </body>
  </html>
`;

const exampleDocument2 = `
  <html>
    <head></head>
    <body>
      <h1>Hello, World.</h1>
      <p>This is an example document to test html truncation.</p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
        <li>List item 4</li>
      </ul>
      <p>This example has a list that should get ignored by the truncation character count.</p>
    </body>
  </html>
`;

describe("rehype-parse", () => {
  it("truncates document correctly", async () => {
    const { contents: exampleDocument1Truncated } = await unified()
      .use(html)
      .use(rehypeTruncate, { maxChars: 50 })
      .use(stringify)
      .process(exampleDocument1);

    expect(exampleDocument1Truncated).toMatchSnapshot();
  });
  it("ignores contents of ignored tags", async () => {
    const { contents: exampleDocument2Truncated } = await unified()
      .use(html)
      .use(rehypeTruncate, { maxChars: 120, ignoreTags: ["ul"] })
      .use(stringify)
      .process(exampleDocument2);

    expect(exampleDocument2Truncated).toMatchSnapshot();
  });
});
