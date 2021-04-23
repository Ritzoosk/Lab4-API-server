"use strict";

const supergoose = require("@code-fellows/supergoose");
const { server } = require("../src/server");
const mockReq = supergoose(server);


describe("API SERVER TEST: ", () => {
  var clothesTest = { name: "test1", size: 'M' };
    it("404 on a bad route", async () => {
      let res = await mockReq.get("/foo");
      expect(res.status).toEqual(404);
    });

    it("404 on a bad method", async () => {
      let res = await mockReq.post("/");
      expect(res.status).toEqual(404);
    });

  it("Should create a record using POST", async () => {
    let res = await mockReq.post("/clothes").send(clothesTest);
    expect(res.status).toEqual(201);
    expect(res.body.name).toEqual(clothesTest.name);
    expect(res.body.size).toEqual(clothesTest.size);
  });

  it("Should read a record using GET", async () => {
    let newFood = await mockReq.post("/clothes").send(clothesTest);
    let id = newFood.body._id;
    let res = await mockReq.get(`/clothes/${id}`);
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual(clothesTest.name);
    expect(res.body.size).toEqual(clothesTest.size);
  });

  it("Should read a list of record using GET", async () => {
    let res = await mockReq.get("/clothes");
    console.log("getAll", res.body);
    expect(res.status).toEqual(200);
  });

  xit("Should update a record using PUT", async () => {
    let newRecord = { name: "test99", size: "S" };
    let oldFood = await mockReq.post("/clothes").send(clothesTest);
    let id = oldFood.body._id;
    let res = await mockReq.put(`/clothes/${id}`).send(newRecord);
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual(newRecord.name);
    expect(res.body.size).toEqual(newRecord.size);
  });

  it("Should update a record using DELETE", async () => {
    let newFood = await mockReq.post("/clothes").send(clothesTest);
    let id = newFood.body._id;
    let res = await mockReq.delete(`/clothes/${id}`);
    expect(res.status).toEqual(200);
    let getResponse = await mockReq.get(`/clothes/${id}`);
    // console.log(getResponse.body)
    expect(getResponse.body).toEqual(null);
  });
});