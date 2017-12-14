const raf = require('raf')

// Have to dirty check since SC's APIs don't yet support all actions that can change total
// Check when supported
function DirtyCheck(){
	this.qty = 0
	this.isChecking = false
	this.events = []
	this.check = this.check.bind(this)
}
DirtyCheck.prototype = {
	start: function(){
		this.isChecking = true
		raf(this.check)
	},
	stop: function(){
		this.isChecking = false
	},
	getQty: function(){
		return window.Snipcart.api.items.count()
	},
	check: function(){
		if(window.Snipcart){
			let qty = this.getQty()
			if(qty !== this.qty){
				this.qty = qty
				this.triggerEvents()
			}
		}
		if (this.isChecking) {
			raf(this.check)
		}
	},
	triggerEvents: function(){
		for(let i = this.events.length; i--;){
			this.events[i](this.qty)
		}
	},
	addChangeEvent: function(fn){
		this.events.push(fn)
		if(this.events.length === 1){
			this.start()
		}
	},
	removeChangeEvent: function(fn){
		let i = this.events.indexOf(fn)
		this.events.splice(i, 1)
		if(this.events.length === 0){
			this.stop()
		}
	}
}

module.exports = new DirtyCheck()