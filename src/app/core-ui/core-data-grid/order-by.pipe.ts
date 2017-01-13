import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "orderBy"
})
export class OrderByPipe implements PipeTransform {
    public transform(values: any[], orderField: string, isDescending: boolean = false): any[] {
        if (!orderField) {
            return values;
        }
        const getField = (value: any) => value[orderField];
        values.sort((value1, value2) => {
            const field1 = getField(value1);
            const field2 = getField(value2);
            let result = 0;
            if (field1 as string && field2 as string) {
                result = field1 < field2 ? -1 : field2 < field1 ? 1 : 0;
            } else if (field1 as number && field2 as number) {
                result = field1 - field2;
            }
            if (isDescending) {
                result = -result;
            }
            return result;
        });
        return values;
    }
}
