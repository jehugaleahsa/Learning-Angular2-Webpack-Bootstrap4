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
            if (typeof field1 === "string" && typeof field2 === "string") {
                result = field1 < field2 ? -1 : field2 < field1 ? 1 : 0;
            } else if (typeof field1 === "number" && typeof field2 === "number") {
                result = field1 - field2;
            } else if (typeof field1 === "boolean" && typeof field2 === "boolean") {
                result = field1 === field2 ? 0 : field1 ? 1 : 0;
            } else if (field1 instanceof Date && field2 instanceof Date) {
                result = field1 < field2 ? -1 : field2 < field1 ? 1 : 0;
            }
            if (isDescending) {
                result = -result;
            }
            return result;
        });
        return values;
    }
}
