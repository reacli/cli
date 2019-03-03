import rimraf from "rimraf"
import path from "path"
import Tacks from "tacks"

import common from "./common"

const basePath = path.resolve(__dirname, path.basename(__filename, ".js"))
const fixturePath = path.resolve(basePath, "test-files")
const File = Tacks.File
const Dir = Tacks.Dir

const withFixture = (testDone, fixture, tester) => {
	const removeAndDone = (err) => {
		if (err) throw err
		fixture.remove(fixturePath)
		rimraf.sync(basePath)
		testDone()
	}

	fixture.create(fixturePath)

	tester(removeAndDone)
}

test("reacli component ./test-component", (testDone) => {
  const fixture = new Tacks(Dir())

  withFixture(testDone, fixture, (done) => {
		common(["component", `${fixturePath}/test-component`], {
			cwd: fixturePath,
		}, (err, code, stdout, stderr) => {
			
			// Load `${fixturePath}/test-component` and compare to fixture

			expect(code).toEqual(0)
			done()
		})
  })
})