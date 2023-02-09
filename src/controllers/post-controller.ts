import express from "express";
import { News } from "../models/news";
import { NewsService } from "../services/news-service";

const postController = express.Router();
const path = "/news";

const service = new NewsService();

postController.post(path, (req, res) => {
  const response = service.insert(
    new News(req.body.title, req.body.description)
  );
  if (response.success()) {
    res.status(201).json(response);
  } else {
    res.status(400).json(response);
  }
});

postController.get(path, (req, res) => {
  const response = service.all();

  if (response.success()) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

postController.get(`${path}/:id`, (req, res) => {
  const id: number = +req.params.id;
  const response = service.findById(id);

  if (response.success()) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

postController.put(`${path}/:id`, (req, res) => {
  const id: number = +req.params.id;

  const response = service.update(
    id,
    new News(req.body.title, req.body.description)
  );
  if (response.success()) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
});

postController.delete(`${path}/:id`, (req, res) => {
  const id: number = +req.params.id;
  const response = service.remove(id);

  if (response.success()) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
});

export default postController;
