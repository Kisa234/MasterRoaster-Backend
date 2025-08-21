export class UpdateNotasDto {
  private constructor(
    public readonly name    ?: string,
    public readonly color   ?: string,
    public readonly parentId?: string,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.name)     returnObj.name = this.name;
    if (this.color)    returnObj.color = this.color;
    if (this.parentId) returnObj.parentId = this.parentId;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateNotasDto?] {
    let { name, color, parentId } = props;

    return [
      undefined,
      new UpdateNotasDto(
        name,
        color,
        parentId,
      )
    ];
  }
}