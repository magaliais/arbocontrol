import { ActiveModelSerializer, createServer, Factory, Model, Response } from 'miragejs';
import { faker } from '@faker-js/faker';
import { string } from 'yup';

type User = {
  name: string;
  email: string;
  created_at: string;
}

type Complaint = {
  id: string;
  status: string;
  cep: string;
  street: string;
  neighborhood: string;
  houseNumber: string;
  complement: string;
  reference: string;
  cellphoneNumber: string;
  phoneNumber: string;
  email: string;
  place: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
      complaint: Model.extend<Partial<Complaint>>({}),
    },

    // ? Criação de dados em massa (factories)
    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
          // return faker.name.fullName();
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
      complaint: Factory.extend({
        id(i: number) {
          return i;
        },
        status(i: number) {
          return i % 3 === 0 ? "pending" : "finished";
        },
        cep() {
          return faker.address.zipCode();
        },
        street() {
          return faker.address.street();
        },
        neighborhood() {
          return "São Mateus";
        },
        houseNumber() {
          return Math.random();
        },
        complement() {
          return "não";
        },
        reference() {
          return "";
        },
      }),
    },

    // ? Gera os dados da fake API (model, quantidade)
    // ? Neste caso, cria uma lista de usuários fake
    seeds(server) {
      server.createList("user", 3);
      server.createList("complaint", 6);
    },

    routes() {
      // ? Define a rota do mirage
      // ? http://localhost:3333/api/...
      this.namespace = "api";

      // ? Causa um delay na chamada, para ficar mais real e testar os
      // ? carregamentos e loadings
      this.timing = 750;

      // ? Shorthands do MirageJS para o CRUD de user
      this.get("/users", function (schema, request) {
        // Paginação
        const { currentPage, per_page = 10 } = request.queryParams;

        const total = schema.all("user").length;

        const pageStart = (Number(currentPage) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all("user")).users.slice(
          pageStart,
          pageEnd
        );

        return new Response(200, { "x-total-count": String(total) }, { users });
      });

      this.get("/users/:id");
      this.post("/users");

      this.get("/complaints");
      this.post("/complaints");
      
      this.get("/dashboard", function (schema, request) {

        const total = schema.all("complaint").length;

        const complaints = this.serialize(schema.all("complaint")).complaints;

        const complaintsStatus = complaints.reduce((acc, cur) => {
          cur.status === "pending" ? acc.pending += 1 : acc.finished += 1;

          return acc;
        }, {
          finished: 0,
          pending: 0,
        })

        return new Response(200, { "x-total-count": String(total) }, { complaintsStatus });
      });

      // ? Para evitar conflitos com as API routes do Next
      this.namespace = "";

      // ? Faz com que todas as chamadas enviadas para a rota api passem pelo mirage,
      // ? mas se não forem detectadas pelas rotas do mirage, elas PASSEM ADIANTE
      // ? para a rota original delas
      this.passthrough();
    },
  });

  return server;
}