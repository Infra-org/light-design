interface IList {
	rank: number
	// 排序值 值越大越靠前
	title: string
	// 弹窗标题
	imgSrc: string
	// 弹窗图片
	target: string
	// 跳转类型 同navigator的target 默认为self
	url: string
	// 跳转链接 同navigator的url
	appId: string
	// appId 同navigator的app-id 仅当target="miniProgram"有效
	version: string
	// 版本 同navigator的version 仅当target="miniProgram"有效
	path: string
	// 路径 同navigator的path 仅当target="miniProgram"有效
	daily: boolean
	// 是否为每日弹窗
	durations: Array<{
		startTime: string
		endTime: string
	}>
	// 弹出时间 支持多个
	// 当daily为true时 格式为18:00:00
	// 当daily为false时 格式为2020/8/1 00:00:00
}

Component({
	options: {
		//@ts-ignore
		pureDataPattern: /^(visible|timer_show|timer_close)$/
	},
	properties: {
		list: <{
			type: ArrayConstructor
			value: Array<IList>
		}>{
			type: Array,
			value: []
		},
		visible: {
			type: Boolean,
			value: false
		},
		zIndex: {
			type: Number,
			value: 100
		}
	},
	data: <{
		_visible: boolean
		_list: Array<IList>
		maskBackgroundColor: string
		style: string
		current: number
		indicatorDots: boolean
		timer_show: number
		timer_close: number
	}>{
		_visible: false,
		_list: [],
		maskBackgroundColor: '',
		style: '',
		current: 0,
		indicatorDots: true,
		timer_show: 0,
		timer_close: 0
	},
	observers: {
		visible (new_val) {
			const _that = this

			clearTimeout(_that.data.timer_show)
			clearTimeout(_that.data.timer_close)

			if (new_val) {
				_that.setData({
					current: 0,
					_visible: true
				})

				const timer_show = setTimeout(() => {
					_that.setData({
						maskBackgroundColor: 'rgba(0,0,0,0.6)',
						style: 'opacity:1;transform:scale(1);transform-origin:center'
					})
				}, 30)

				_that.setData({ timer_show })
			} else {
				_that.setData({
					maskBackgroundColor: 'transparent',
					style: 'opacity:0;transform:scale(0);transform-origin:center'
				})

				const timer_close = setTimeout(() => {
					_that.setData({ _visible: false })
				}, 300)

				_that.setData({ timer_close })
			}
		}
	},
	lifetimes: {
		attached () {
			const _that = this
			const { list } = _that.data
			const target_list: Array<any> = []

			if (Array.isArray(list) && list.length) {
				list.map((item) => {
					if (!item.durations.length) return

					const show_time = wx.getStorageSync(`has_shown_${item.title}`)

					item.durations.map((it: any) => {
						if (item.daily) {
							const now = new Date()
							const now_start = new Date()
							const now_end = new Date()
							const start = it.startTime.split(':')
							const end = it.endTime.split(':')

							now_start.setHours(start[0])
							now_start.setMinutes(start[1])
							now_start.setSeconds(start[2])

							now_end.setHours(end[0])
							now_end.setMinutes(end[1])
							now_end.setSeconds(end[2])

							if (show_time) {
								if (
									show_time > now_start.valueOf() &&
									show_time < now_end.valueOf()
								) {
									return
								}
							}

							if (
								now.valueOf() > now_start.valueOf() &&
								now.valueOf() < now_end.valueOf()
							) {
								target_list.push(item)

								if (show_time) {
									wx.removeStorageSync(
										`has_shown_${item.title}`
									)
								}
							}
						} else {
							const now = new Date().valueOf()
							const start = new Date(it.startTime).valueOf()
							const end = new Date(it.endTime).valueOf()

							if (show_time) {
								if (show_time > start && show_time < end) {
									return
								}
							}

							if (now.valueOf() > start && now.valueOf() < end) {
								target_list.push(item)

								if (show_time) {
									wx.removeStorageSync(
										`has_shown_${item.title}`
									)
								}
							}
						}
					})
				})

				if (target_list.length === 0) {
					_that.setData({ _visible: false })

					return
				}

				if (target_list.length === 1) {
					_that.setData({ indicatorDots: false })
				}

				if (target_list.length > 1) {
					target_list.sort((a, b) => b.rank - a.rank)
				}

				_that.setData({ _list: target_list })
			}
		}
	},
	methods: {
		catchtouchmove () {},
		onShow () {
			const _that = this

			_that.setData({ visible: true })

			_that.triggerEvent('onShow')
		},
		onClose () {
			const _that = this
			const { _list } = _that.data

			_that.setData({ visible: false })

			_that.triggerEvent('onClose')

			const item = _list[_list.length - 1]

			if (!wx.getStorageSync(`has_shown_${item.title}`)) {
				wx.setStorageSync(`has_shown_${item.title}`, new Date().valueOf())
			}
		},
		onChange (e: any) {
			const _that = this
			const { _list } = _that.data
			const { detail: { current } } = e

			_that.setData({ current })

			if (current === 0) return

			const item = _list[current - 1]

			if (!wx.getStorageSync(`has_shown_${item.title}`)) {
				wx.setStorageSync(`has_shown_${item.title}`, new Date().valueOf())
			}
		},
		onPrev () {
			const _that = this
			const { current } = _that.data

			_that.setData({ current: current - 1 })
		},
		onNext () {
			const _that = this
			const { current, _list } = _that.data

			_that.setData({ current: current + 1 })

			_that.triggerEvent('onNext', { current: _list[current] })
		},
		getDateStamp (date) {
			return new Date(date).valueOf()
		}
	}
})
