export default interface ICreatedAtEntity {
  /** created timestamp */
  createdAt: Date;

  /** user id what trigger create event */
  createdBy: string;
}
