import { IEnrollmentRepository } from "../interface/enrollment_repository_interface";
import Enrollment, { IEnrollment } from "../schema/enrollment";

export class EnrollmentRepository implements IEnrollmentRepository {
  async create(enrollment: IEnrollment): Promise<IEnrollment> {
    return Enrollment.create(enrollment);
  }

  async findByCourse(courseId: string): Promise<IEnrollment[]> {
    return Enrollment.find({ course: courseId }).exec();
  }
}
