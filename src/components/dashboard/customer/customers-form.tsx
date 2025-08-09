'use client'

import { Customer } from "@/types/customers";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    StepLabel,
    Stepper,
    Step,
    TextField,
    Box,
    Alert,
} from "@mui/material";
import { useEffect, useState } from "react";

interface CustomersFormProps {
    open: boolean,
    customer: Customer | undefined,
    onClose: () => void,
}

export function CustomersForm({
    open,
    customer,
    onClose,
}: CustomersFormProps) {
    const steps = ["Dados Pessoais", "Contato", "Telefone"];

    const [activeStep, setActiveStep] = useState(0);
    const [formCustomer, setFormCustomer] = useState<Customer | undefined>(customer);
    const [errors, setErrors] = useState<{ nome?: string; email?: string; telefone?: string }>({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (open) {
            setFormCustomer(customer);
            setActiveStep(0);
            setErrors({});
            setSubmitted(false);
        }
    }, [open, customer]);

    const handleClose = () => {
        setActiveStep(0);
        setErrors({});
        setSubmitted(false);
        onClose();
    };

    const stepValidation = (): boolean => {
        let stepErrors: typeof errors = {};
        if (activeStep === 0 && (!formCustomer?.name || !formCustomer.name.trim())) {
            stepErrors.nome = "Nome é obrigatório";
        }
        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
    };

    const handleNext = () => {
        if (stepValidation()) {
            setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0));
        setErrors({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormCustomer((prev) => prev ? { ...prev, [name]: value } : prev);
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleFinish = () => {
        if (stepValidation()) {
            setSubmitted(true);

            setTimeout(() => {
                handleClose();
            }, 1200);
        }
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <TextField
                        label="Nome"
                        name="name"
                        value={formCustomer?.name || ''}
                        onChange={handleChange}
                        error={!!errors.nome}
                        helperText={errors.nome}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        autoFocus
                    />
                );
            default:
                return "Passo desconhecido";
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Formulário de Cliente</DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box mt={2}>{getStepContent(activeStep)}</Box>
                {submitted && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Cliente cadastrado com sucesso!
                    </Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button disabled={activeStep === 0 || submitted} onClick={handleBack}>
                    Voltar
                </Button>
                {activeStep === steps.length - 1 ? (
                    <Button onClick={handleFinish} color="primary" variant="contained" disabled={submitted}>
                        Finalizar
                    </Button>
                ) : (
                    <Button onClick={handleNext} color="primary" variant="contained">
                        Próximo
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
