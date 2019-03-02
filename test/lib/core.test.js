const rimraf = require("rimraf")
const path = require("path")
const basePath = path.resolve(__dirname, path.basename(__filename, ".js"))
const fixturePath = path.resolve(basePath, "test-files")
const testDirPath = path.resolve(fixturePath, "npm-test-cli")
const Tacks = require("tacks")
const File = Tacks.File
const Dir = Tacks.Dir

test("reacli component ./test-component", (testDone) => {
  let runner

  const fixture = new Tacks(Dir({
    "test-dir": Dir()
  }))

  withFixture(testDone, fixture, (done) => {
		expect(true).toBeTruthy()
		done()
  })
})

function withFixture (testDone, fixture, tester) {
	fixture.create(fixturePath)

	tester(removeAndDone)

	function removeAndDone (err) {
		if (err) throw err
		fixture.remove(fixturePath)
		rimraf.sync(basePath)
		testDone()
	}
}