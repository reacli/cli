import { validateName, validatePath } from "../lib/utils/validators"

describe("validator functions", () => {
	describe("validateName()", () => {
		it("should return true if name is in a good format", () => {
			const path = "./path/to/name"
			const isNameValid = validateName(path)

			expect(isNameValid).toBeTruthy()
		})

		xit("should return false if name is in a wrong format", () => {
			const path = "./path/to/na^me"
			const isNameValid = validateName(path)

			expect(isNameValid).toBeFalsy()
		})

		xit("should return false if no name is provided", () => {
			const path = ""
			const isNameValid = validateName(path)

			expect(isNameValid).toBeFalsy()
		})
	})

	describe("validatePath()", () => {
		it("should return true if path is in a good format", () => {
			const path = "./path/to/name"
			const isPathValid = validatePath(path)

			expect(isPathValid).toBeTruthy()
		})

		xit("should return false if path is in a wrong format", () => {
			const path = "../../../path/to/name"
			const isPathValid = validatePath(path)

			expect(isPathValid).toBeFalsy()
		})

		xit("should return false if no path is provided", () => {
			const path = ""
			const isPathValid = validatePath(path)

			expect(isPathValid).toBeFalsy()
		})
	})
})