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

  watch: {
    currentNumber: function () {
      if ( this.items.length-1 < this.currentNumber)
      {
        this.currentNumber = 0;
      }
      if( this.currentNumber < 0)
      {
        this.currentNumber = this.items.length-1;
      }

    }
  },

  computed: {
    suggestions() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    },
  },

  created() {
    this.getItems();
    this.getTickets();
  },


  methods: {

    fileChanged(event) {
     this.file = event.target.files[0]
   },

   async upload() {
     try {
       const formData = new FormData();
       formData.append('photo', this.file, this.file.name)
       let r1 = await axios.post('/api/photos', formData);
       let r2 = await axios.post('/api/items', {
         title: this.title,
         description: this.description,
         path: r1.data.path
       });
       this.addItem = r2.data;
     } catch (error) {
       console.log(error);
     }
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


    nextItem()
    {
      this.currentNumber = this.currentNumber + 1;
    },

    previousItem()
    {
      this.currentNumber = this.currentNumber - 1;
    },



    async getTickets() {
      try {
        let response = await axios.get("/api/tickets");
        this.tickets = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addTicket() {
      try {
        let response = await axios.post("/api/tickets", {
          name: this.addedName,
          problem: this.addedProblem
        });
        this.addedName = "";
        this.addedProblem = "";
        this.getTickets();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTicket(ticket) {
      try {
        let response = axios.delete("/api/tickets/" + ticket.id);
        this.getTickets();
        return true;
      } catch (error) {
        console.log(error);
      }
    },


  }
});
