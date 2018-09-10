const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const casual = require('casual');

const typeDefs = `
    #Esto es un curso del Esquema
    type Curso {
        id: ID!
        titulo: String!
        descripcion: String!
        comentarios: [Comentario]
        profesor: Profesor
        rating: Float @deprecated(reason: "No será necesario")
    }
    type Query {
        cursos: [Curso]
        profesores: [Profesor]
        curso(id: Int): Curso
        profesor(id: Int): Profesor
    }

    type Profesor {
        id: ID!
        nombre: String!
        nacionalidad: String!
        genero: Genero
        cursos: [Curso]
    }

    enum Genero {
        MASCULINO
        FEMENINO
    }

    type Comentario {
        id: ID!
        nombre: String!
        cuerpo: String!
    }
    `

    const resolvers = {
        Query: {
            cursos: () => {
                return [{
                    id: 1,
                    titulo: "Curso de GraphQL",
                    descripcion: "Basics GraphQL"
                }, {
                   id: 1,
                   titulo: "Curso de PHP",
                   descripcion: "Basics PHP"
                }]
            }
        },
        Curso: {
            profesor: () => {
                return {
                    id: 1,
                    nombre: "Pablo",
                    nacionalidad: "Española"
                }
            },
            comentarios: () => {
                return [{
                    id: 1,
                    nombre: "Juan",
                    cuerpo: "Buen video"
                }]
            }
        }  
    }    

 const schema = makeExecutableSchema ({
     typeDefs,
     resolvers
 })

 addMockFunctionsToSchema ({
     schema,
     mocks: {
         Curso: () => {
             return {
                 id: casual.uuid,
                 titulo: casual.sentence,
                 descripcion: casual.sentences[2]
             }
         },
         Profesor: () => {
             return {
                 nombre: casual.name,
                 nacionalidad: casual.country
             }
         }
     }
 })

module.exports = schema