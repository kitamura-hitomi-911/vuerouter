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
		props:{
			id:{
				type:[String,Number],
				required:true
			}
		},
		template:"#tmpl-page"
	};

	const router = new VueRouter({
		routes:[
			{
				name:'index',
				path: '/',
				components: {
					header:header,
					content:index
				},
				props:{
					header:false,
					content:false
				}
			},
			{
				name:'page',
				path: '/page/:id',
				components: {
					header:header,
					content:page
				},
				props:{
					header:false,
					content:true
				}
			}
		],
		scrollBehavior (to, from, savedPosition) {
			if (savedPosition) {
				return savedPosition
			} else {
				return { x: 0, y: 0 }
			}
		}
	});

	function setMeta(to){
		var setMetaOf = {
			index:function(to){
				document.title = 'インデックス';
				document.querySelector("meta[name='description']").setAttribute('content', 'インデックスのdesc');
			},
			page:function(to){
				console.log(to);
				document.title = to.params.id+'ページめ';
				document.querySelector("meta[name='description']").setAttribute('content', to.params.id+'めページのdesc');
			}
		};
		setMetaOf[to.name] && setMetaOf[to.name](to);
	}

	router.beforeEach(function(to,from,next){
		console.log('beforeEach',to.name);
		setMeta(to);
		next();
	});

	const app = new Vue({
		el:'#app',
		router:router
	});

}).call(this);