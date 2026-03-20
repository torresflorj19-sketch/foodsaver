const { createApp } = Vue;

createApp({
  data() {
    return {
      nombre: "",
      fecha: "",
      alimentos: [],
      error: "",
      filtro: "todos"
    }
  },

  computed: {
    listaFiltrada() {
      return this.alimentos.filter(item => {
        const estado = this.estado(item.fecha);

        if (this.filtro === "vencidos") return estado === "vencido";
        if (this.filtro === "proximos") return estado === "proximo";
        if (this.filtro === "buenos") return estado === "ok";
        return true;
      });
    }
  },

  methods: {
    agregar() {
      if (!this.nombre || !this.fecha) {
        this.error = "Todos los campos son obligatorios";
        return;
      }

      this.error = "";
      this.alimentos.push({
        nombre: this.nombre,
        fecha: this.fecha
      });

      this.nombre = "";
      this.fecha = "";
    },

    eliminar(index) {
      this.alimentos.splice(index, 1);
    },

    limpiarInputs() {
      this.nombre = "";
      this.fecha = "";
      this.error = "";
    },

    vaciarLista() {
      this.alimentos = [];
    },

    marcarConsumido(index) {
      alert("Alimento consumido ✔");
      this.eliminar(index);
    },

    estado(fecha) {
      const hoy = new Date();
      const f = new Date(fecha);
      const diff = (f - hoy) / (1000 * 60 * 60 * 24);

      if (diff < 0) return "vencido";
      if (diff <= 3) return "proximo";
      return "ok";
    },

    mensajeEstado(fecha) {
      const hoy = new Date();
      const f = new Date(fecha);
      const diff = (f - hoy) / (1000 * 60 * 60 * 24);

      if (diff < 0) return "Vencido";
      if (diff <= 3) return "Por vencer";
      return "En buen estado";
    }
  }
}).mount("#app");