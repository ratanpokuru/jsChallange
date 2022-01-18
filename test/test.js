var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost");

// UNIT test begin

describe("Library actions", function () {
  // #1 should return home page

  it("should return all titles with comma seperator", function (done) {
    // calling home page api
    server
      .get("/")
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        if (err) return done(err);
        // HTTP status should be 200
        res.status.should.equal(200);
        if (err) return done(err);
        done();
      });
  });

  it("should add book to library", function (done) {
    //calling ADD api
    server
      .post("/")
      .send({ book: "this is lab" })
      .expect("Content-type", "text/html; charset=utf-8")
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);

        if (err) return done(err);
        done();
      });
  });

  it("should throw error", function (done) {
    //calling ADD api
    server
      .post("/")
      .send({ book: "Harry Potter" })
      .expect(400)
      .end(function (err, res) {
        res.status.should.equal(400);
        if (err) return done(err);
        done();
      });
  });

  it("should delete book to library", function (done) {
    //calling ADD api
    server
      .delete("/")
      .send({ book: "Harry Potter" })
      .expect("Content-type", "text/html; charset=utf-8")
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        if (err) return done(err);
        done();
      });
  });

  it("should throw Error", function (done) {
    //calling ADD api
    server
      .delete("/")
      .send({ book: "2012" })
      .expect(400)
      .end(function (err, res) {
        res.status.should.equal(400);
        if (err) return done(err);
        done();
      });
  });

  it("should throw Error 400", function (done) {
    //calling ADD api
    server
      .patch("/")
      .send({ book: "2012" })
      .expect(400)
      .end(function (err, res) {
        res.status.should.equal(400);
        if (err) return done(err);
        done();
      });
  });

  it("should throw Error 400", function (done) {
    //calling ADD api
    server
      .patch("/")
      .send({ original_book: "2012", new_book: "Harry Potter" })
      .expect(400)
      .end(function (err, res) {
        res.status.should.equal(400);
        if (err) return done(err);
        done();
      });
  });

  it("should updated the book", function (done) {
    //calling ADD api
    server
      .patch("/")
      .send({ original_book: "Moby Dick", new_book: "Two states" })
      .expect("Content-type", "text/html; charset=utf-8")
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        if (err) return done(err);
        done();
      });
  });

  it("should give an array of data", function (done) {
    //calling ADD api
    server
      .put("/")
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        if (err) return done(err);
        done();
      });
  });
});
