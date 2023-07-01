import { IEnrollment } from "../schema/enrollment";

export interface IEnrollmentRepository {
  create(enrollment: IEnrollment): Promise<IEnrollment>;
  findByCourse(courseId: string): Promise<IEnrollment[]>;
}
