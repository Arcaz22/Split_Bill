import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormFieldProps } from '../interface/formfield-interface';

export default function FormField({ id, label, type, value, onChange, disabled  }: FormFieldProps) {
    return (
        <div>
            <Label htmlFor={id} className="block text-sm font-medium text-[#061A40]">
                {label}
            </Label>
            <Input
                id={id}
                type={type}
                size="medium"
                variant="default"
                value={value}
                onChange={onChange}
                disabled={disabled} 
            />
        </div>
    );
}
