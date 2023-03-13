const annotations = {
  openapi: '3.0.0',
  info: {
    title: ' CRUD app with authentication, validation and token',
    version: '1.0.0',
    description: 'Simple CRUD app ',
  },
  components: {
    schemas: {
      Student: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '60ecb6aaeae6e045bb6f9e6c',
          },
          name: {
            type: 'string',
            example: 'Gloria',
          },
          class: {
            type: 'string',
            example: 'y1c',
          },
        },
      },
      StudentInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'My name',
          },
          age: {
            type: 'number',
            example:7,
          },
          class: {
            type: 'string',
            example: 'Yr1B',
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '60ecb6aaeae6e045bb6f9e6c',
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            example: 'johndoe@example.com',
          },
          password: {
            type: 'string',
            example: 'password123',
          },
        },
      },

      UserInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Ineza Gloria',
          },
          email: {
            type: 'string',
            example: 'glorineza2@gmail.com',
          },
          password: {
            type: 'string',
            example: 'password123',
          },
        },
      },  
    },
  },
  paths: {
      '/students': {
        get: {
          summary: 'Get all students',
          responses: {
            200: {
              description: 'List of students',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/studentList',
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Add a new student',
          requestBody: {
            description: 'student object that needs to be added to the library',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/studentInput',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'student added successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/student',
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
            },
          },
        },
      },
      '/students/{id}': {
        get: {
          summary: 'Get a student by ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the student to retrieve',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'student details',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/student',
                  },
                },
              },
            },
            404: {
              description: 'student not found',
            },
          },
        },
        put: {
          summary: 'Update a student by ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the student to update',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          requestBody: {
            description: 'student object that needs to be updated',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/studentInput',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'student updated successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/student',
                  },
                },
              },
            },
            404: {
              description: 'student not found',
            },
            500: {
              description: 'Internal server error',
            },
          },
        },
        delete: {
          summary: 'Delete a student by ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the student to delete',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'student deleted successfully',
            },
            404: {
              description: 'student not found',
            },
            500: {
              description: 'Internal server error',
            },
          },
        },
      },
    }
  }
  
  module.exports={annotations}