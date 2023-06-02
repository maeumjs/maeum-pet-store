export default interface IUpdatedAtEntity {
  /** updated timestamp */
  updatedAt: Date;

  /** user id what trigger update event */
  updatedBy: string;
}
