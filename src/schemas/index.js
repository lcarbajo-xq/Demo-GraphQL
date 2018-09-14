const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const resolvers = require('../resolvers/resolvers')
const Profesor = require('./profesor')
const Curso = require('./curso')

const rootQuery = `
    union SearchResult = Profesor | Curso
    type Query {
        cursos: [Curso]
        profesores: [Profesor]
        curso(id: Int): Curso
        profesor(id: Int): Profesor
        search(query: String!): [SearchResult]
    }
    type Mutation {
        profesorAdd(profesor: NuevoProfesor): Profesor
        profesorEdit(profesorId: Int, profesor: ProfesorEditable): Profesor
        profesorDelete(profesorId: Int): Profesor
        cursoAdd(curso: NuevoCurso): Curso
        cursoEdit(cursoId: Int, curso: cursoEditable): Curso
        cursoDelete(cursoId: Int): Curso
    }
    `
 const schema = makeExecutableSchema ({
     typeDefs: [rootQuery, Profesor, Curso],
     resolvers
 })

module.exports = schema