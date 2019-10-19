const paper = require("../components/PaperTable/PaperTable");

it("renders without crashing", () => {
  return paper.componentDidMount().then(data => {
    expect(data.names.length).toEqual(100);
  });
});
