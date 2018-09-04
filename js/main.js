/**
 * Created by hinit on 2018/09/04.
 */
(function(){
	"use strict";

	const header = {
		template:"#tmpl-header"
	};

	const index = {
		template:"#tmpl-index"
	};

	const page = {
		template:"#tmpl-page"
	};

	const router = new VueRouter({
		routes:[
			{
				path: '/',
				components: {
					header:header,
					content:index
				}
			},
			{
				name:'page',
				path: '/page/:id',
				components: {
					header:header,
					content:page
				}
			}
		]
	})

	const app = new Vue({
		el:'#app',
		router:router
	});

}).call(this);