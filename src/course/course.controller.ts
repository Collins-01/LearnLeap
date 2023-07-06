import CourseService from "./course.service";
import { Request, Response } from "express";

export default class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  createCourse = async (request: Request, response: Response) => {
    const data = await this.courseService.createCourse(request.body);
    return response.status(200).json({
      message: "Successfully Create Course",
      data,
    });
  };
}
