import { Injectable, Scope } from '@nestjs/common';
import { CustomResponse } from 'src/common/interfaces/custom-response.interface';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class LongPollingService {
  private connections = new Map<string, CustomResponse[]>();

  public addConnection(key: string, res: CustomResponse): void {
    const existingConnections: CustomResponse[] | undefined =
      this.connections.get(key);

    if (existingConnections && existingConnections.length) {
      this.connections.set(key, [...existingConnections, res]);
    } else {
      this.connections.set(key, [res]);
    }

    console.log('here is the list of connections');
    console.log(this.connections.size);
  }

  public removeConnection(key: string, responseId?: string): void {
    const connections = this.connections.get(key);

    if (responseId) {
      this.connections.set(
        key,
        connections.filter((res) => res.id !== responseId),
      );
    } else {
      this.connections.delete(key);
    }
    console.log('removed connections on the list');
    console.log(this.connections.size);
  }

  public getConnection(key: string): CustomResponse[] | undefined {
    return this.connections.get(key);
  }

  public sendToConnections(key: string, payload: string): void {
    const connections = this.connections.get(String(key));

    if (connections && connections.length)
      connections.forEach((res) => {
        res.send(payload);
      });
  }
}
