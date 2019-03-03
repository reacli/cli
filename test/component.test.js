import rimraf from "rimraf"
import path from "path"
import Tacks from "tacks"
import dircompare from "dir-compare"

import common from "./common"

const basePath = path.resolve(__dirname, path.basename(__filename, ".js"))
const fixturePath = path.resolve(basePath, "test-files")
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

describe("Component creation with CLI", () => {
	test("reacli component ./simple-component", (testDone) => {
		const fixture = new Tacks(Dir())
		const componentName = "simple-component"
		const expectedPath = path.resolve(__dirname, "fixtures", componentName)
		const componentPath = path.resolve(`${fixturePath}/${componentName}`)
	
		withFixture(testDone, fixture, (done) => {
			common(["component", componentPath], {
				cwd: fixturePath,
			}, (err, code, stdout, stderr) => {
				const { same } = dircompare.compareSync(expectedPath, componentPath);
				
				expect(same).toBeTruthy()
				expect(code).toEqual(0)
				done()
			})
		})
	})
	
	test("reacli component ./flow-component --flow", (testDone) => {
		const fixture = new Tacks(Dir())
		const componentName = "flow-component"
		const expectedPath = path.resolve(__dirname, "fixtures", componentName)
		const componentPath = path.resolve(`${fixturePath}/${componentName}`)
	
		withFixture(testDone, fixture, (done) => {
			common(["component", componentPath, "--flow"], {
				cwd: fixturePath,
			}, (err, code, stdout, stderr) => {
				const { same } = dircompare.compareSync(expectedPath, componentPath);
				
				expect(same).toBeTruthy()
				expect(code).toEqual(0)
				done()
			})
		})
	})

	test("reacli component ./redux-component --redux", (testDone) => {
		const fixture = new Tacks(Dir())
		const componentName = "redux-component"
		const expectedPath = path.resolve(__dirname, "fixtures", componentName)
		const componentPath = path.resolve(`${fixturePath}/${componentName}`)
	
		withFixture(testDone, fixture, (done) => {
			common(["component", componentPath, "--redux"], {
				cwd: fixturePath,
			}, (err, code, stdout, stderr) => {
				const { same } = dircompare.compareSync(expectedPath, componentPath);
				
				expect(same).toBeTruthy()
				expect(code).toEqual(0)
				done()
			})
		})
	})

	test("reacli component ./scss-component --scss", (testDone) => {
		const fixture = new Tacks(Dir())
		const componentName = "scss-component"
		const expectedPath = path.resolve(__dirname, "fixtures", componentName)
		const componentPath = path.resolve(`${fixturePath}/${componentName}`)
	
		withFixture(testDone, fixture, (done) => {
			common(["component", componentPath, "--scss"], {
				cwd: fixturePath,
			}, (err, code, stdout, stderr) => {
				const { same } = dircompare.compareSync(expectedPath, componentPath);
				
				expect(same).toBeTruthy()
				expect(code).toEqual(0)
				done()
			})
		})
	})
})