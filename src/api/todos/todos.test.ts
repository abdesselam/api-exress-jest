import request from 'supertest';

import app from '../../app';
import { Todos } from './todos.model';

beforeAll(async ()=>{
    try {
        await Todos.drop();
    } catch (error) {}
})

describe('GET /api/v1/todos', () => {
  it('responds with an any of todos', async () => 
    request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200).then((response)=>{
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
    }),
  );
});
describe('POST /api/v1/todos', () => {
  it('responds with an error if the todo is invalid', async () => 
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        content:''
      })
      .expect(422).then((response)=>{
        console.log('messsage--->',response.body.message)
        expect(response.body).toHaveProperty('message');
    }),
  );
  it('responds with an inserted object', async () => 
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        content:'Learn TypeScript',
        done : false,
      })
      .expect(200).then((response)=>{
        console.log('response.body---->',response.body)
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('content');
        expect(response.body.content).toBe('Learn TypeScript');
        expect(response.body).toHaveProperty('done');
    }),
  );
});

