import Vue from 'vue/dist/vue.esm';
import axios from 'axios';



Vue.component('sidebar-item', {
	props: ['item', 'active'],
	template: `
		<a href="#" class="Sidebar-item"
			:class="{ 'Sidebar-item--active': item.path == active }"
			@click="$emit('click')"
		>{{ item.name }}</a>
	`
});



let app = new Vue({
	el: '#app',
	data: {
		content: null,
		active:  null,
		contentHTML: '<h1>Loading...</h1>',
	},
	mounted() {
		axios.get('content/content.json').then(res => {
			this.content = res.data.content;
			this.active = res.data.initial;
			this.load(this.active);
		});
	},
	methods: {
		load(path) {
			axios.get(`content/${path}.html`).then(res => this.contentHTML = res.data);
		},
		handleSidebarItemTap(item) {
			this.active = item;
			this.load(item);
		}		
	}
});