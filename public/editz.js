var app = new Vue({
  el: '#admin',
  data: {
    number:'',
    title: "",
    file: null,
    description: "",
    addItem: null,
    items: [],
    findTitle: "",
    findItem: null,
    currentNumber: 0,

    addedName: '',
    addedProblem: '',
    tickets: {},
  },


  computed: {
    suggestions() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    },
  },

  created() {
    this.getItems();
  },


  methods: {

    fileChanged(event) {
     this.file = event.target.files[0]
   },

   async getItems() {
     try {
       let response = await axios.get("/api/items");
       this.items = response.data;
       return true;
     } catch (error) {
       console.log(error);
     }
   },

   selectItem(item) {
     this.findTitle = "";
     this.findItem = item;
   },

   async deleteItem(item) {
     try {
       let response = axios.delete("/api/items/" + item._id);
       this.findItem = null;
       this.getItems();
       return true;
     } catch (error) {
       console.log(error);
     }
   },

   async editItem(item) {
      try {
        let response = await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },








  }
});
