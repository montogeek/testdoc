var vfile = require('to-vfile');
var remark = require('remark');
var mermaid = require('remark-mermaid');
var report = require('vfile-reporter');
var meta = require("remark-meta")
var frontmatter = require("remark-frontmatter")

var example = vfile.readSync('./index.md');


remark()
  .use(frontmatter)
  .use(meta)
  .use(mermaid)
  .process(example, function (err, file) {
    console.log(String(file))
    console.error(report(err || file))
  })