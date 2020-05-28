Page({
	data: {
		visible_bottom: false
	},
	onOption (e: any) {
		const _that = this
		const { mark: { type } } = e

		if (!type) return

		_that.setData({
			[`visible_${type}`]: true
		})
	}
})
