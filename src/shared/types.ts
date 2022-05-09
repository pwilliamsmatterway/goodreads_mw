export type Resolver<T> = (value: T) => void;

// Export types used across your skills here
export interface SkillData {
  employeeId: string,
  employeeFirstName: string,
  employeeLastName: string,
}
