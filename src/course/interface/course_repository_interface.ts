import Course, { ICourse } from "../schema/course";
export interface ICourseRepository {
  create(course: ICourse): Promise<ICourse>;
  findById(id: string): Promise<ICourse | null>;
  findAll(): Promise<ICourse[]>;
}
