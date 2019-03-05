
import rimraf from "rimraf"
import path from "path"
import Tacks from "tacks"
import dircompare from "dir-compare"

import common from "../common"

const basePath = path.resolve(__dirname, path.basename(__filename, ".js"))
const fixturePath = path.resolve(basePath, "test-files")
const Dir = Tacks.Dir

const withFixture = (testDone, fixture, tester) => {
	const removeAndDone = (err) => {
		if (err) throw err
		// Comment these two lines if the tested component
		// fixture does not exist yet, then copy-paste it 
		// into /fixtures and uncomment back those lines
		fixture.remove(fixturePath)
		rimraf.sync(basePath)
		testDone()
	}

	fixture.create(fixturePath)

	tester(removeAndDone)
}

describe("Hook creation with CLI", () => {
    test("reacli hook ./simple-hook", (testDone) => {
        const fixture = new Tacks(Dir())
        const hookName = "simple-hook"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", hookName)
        const hookPath = path.resolve(`${fixturePath}/${hookName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["hook", hookPath], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, hookPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    })
    
    test("reacli hook ./scss-hook --scss", (testDone) => {
        const fixture = new Tacks(Dir())
        const hookName = "scss-hook"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", hookName)
        const hookPath = path.resolve(`${fixturePath}/${hookName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["hook", hookPath, "--scss"], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, hookPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    })

    test("reacli hook ./extension-js-hook --extension js", (testDone) => {
        const fixture = new Tacks(Dir())
        const hookName = "extension-js-hook"
        const expectedPath = path.resolve(__dirname, "..", "fixtures", hookName)
        const hookPath = path.resolve(`${fixturePath}/${hookName}`)
    
        withFixture(testDone, fixture, (done) => {
            common(["hook", hookPath, "--extension", "js"], {
                cwd: fixturePath,
            }, (err, code, stdout, stderr) => {
                const { same } = dircompare.compareSync(expectedPath, hookPath);
                
                expect(same).toBeTruthy()
                expect(code).toEqual(0)
                done()
            })
        })
    })
})