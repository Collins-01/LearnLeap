import { CreateEnrollmentDTO } from "../dtos/create_enrollment.dto";
import { UpdateEnrollmentDTO } from "../dtos/update_enrollment.dto";
import { IEnrollment } from "../schema/enrollments";

interface IEnrollmentRepository {
  getAllUserEnrollments(userId: string): Promise<IEnrollment[]>;

  updateEnrollmentStatus(
    userId: string,
    dto: UpdateEnrollmentDTO
  ): Promise<IEnrollment | null>;

  getSingleEnrollment(
    userId: string,
    courseId: string
  ): Promise<IEnrollment | null>;
  createEnrollment(
    dto: CreateEnrollmentDTO,
    userId: string
  ): Promise<IEnrollment | null>;
}

export default IEnrollmentRepository;
