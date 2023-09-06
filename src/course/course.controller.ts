import multer from "multer";
import HttpException from "../errors/base-http-exception";
import CourseService from "./course.service";
import { Request, Response, NextFunction } from "express";

export default class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  createCourse = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (request.user?.role !== "tutor") {
      throw new HttpException(
        403,
        `Only tutors are allowed to creted courses.`
      );
    }
    try {
      // const data = await this.courseService.createCourse(
      //   request.body,
      //   request.user?.id,
      //   request.file!
      // );

      const data = {
        files: request.files?.length,
        // media: request.files["media"][0],
      };
      return response.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getSingleCourseById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.courseService.getCourseById(request.params.id);
      return response.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCourse = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.courseService.deleteCourse(
        request.params.id,
        request.user?.id
      );
      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getAllCourses = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      console.log(request.user?.firstName);
      const data = await this.courseService.getAllCourses();
      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
  getAllCoursesByInstructor = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.courseService.getAllCoursesByInstructorId(
        request.params.id
      );
      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
