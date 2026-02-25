export class CommandHelper {
  static trimCommand(command: string, entityLength: number): string {
    return command.substring(1, entityLength);
  }
}
