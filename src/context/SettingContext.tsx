import { useAuth } from "@context";
import { settingServices } from "@services";
import { SettingContextTypes } from "@types";
import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "@helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SettingContext = createContext<SettingContextTypes | undefined>(
  undefined
);

export const SettingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { userData, setUserData } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const queryClient = useQueryClient();
  const postInvoiceRulesMutation = useMutation({
    mutationFn: (data: unknown) => postInvoiceRules(data),
    onSuccess: () => {
      toast.success(
        "New Rule Successfully Added",
        "The rule has been added to the system."
      );
      queryClient.invalidateQueries({ queryKey: ["invoiceRules"] });
    },
    onError: (error) => {
      toast.error("Error Occured", `Failed to Add Rule:  ${error.message || error}`);
    },
  });

  const deleteInvoiceRulesMutation = useMutation({
    mutationFn: (ruleId: string) => deleteInvoiceRules(ruleId),
    onSuccess: () => {
      toast.success(
        "Rule Deleted",
        "The invoice rule has been successfully removed from the system."
      );
      queryClient.invalidateQueries({ queryKey: ["invoiceRules"] });
    },
    onError: (error) => {
      toast.error(
        "Deletion Failed",
        `Unable to delete the invoice rule. Error: ${error.message || error}`
      );
    },
  });


  const updateInvoiceRulesMutation = useMutation({
    mutationFn: ({ ruleId, data }: { ruleId: string; data: unknown }) =>
      updateInvoiceRulesStatus(ruleId, data),
    onSuccess: () => {
      toast.success(
        "Rule Status Updated",
        "The invoice rule status has been successfully updated in the system."
      );
      queryClient.invalidateQueries({ queryKey: ["invoiceRules"] });
    },
    onError: (error) => {
      toast.error("Error Occured", `Failed to Update Status:  ${error.message || error}`);
    },
  });

  const changePassword = async (data: unknown) => {
    try {
      setErrorMessage("");
      const response = await settingServices.changePassword(data);
      console.log(response);
      toast.success(
        "Update Complete",
        "Your password has been successfully updated."
      );
      return response;
    } catch (error) {
      console.log(error);
      setErrorMessage(
        typeof error === "object" ? (error as Error)?.message : String(error)
      );
    }
  };

  const changeUserData = async (data: unknown) => {
    try {
      const response = await settingServices.changeUserData(
        data,
        userData?._id || ""
      );
      setUserData(response.data.data);
      console.log("Checking the update");
      toast.success(
        "Update Complete",
        "The data has been updated successfully."
      );
    } catch (error) {
      console.log(error);
      setErrorMessage(
        typeof error === "object" ? (error as Error)?.message : String(error)
      );
    }
  };

  const createInvoiceExportFormat = async (data: unknown) => {
    try {
      const response = await settingServices.createInvoiceExportFormat(data);
      console.log(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getInvoiceFormatExport = async () => {
    try {
      const response = await settingServices.getInvoiceFormatExport();
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const selectExportFormat = async (data: unknown) => {
    try {
      const response = await settingServices.selectExportFormat(data);
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const updateExportFieldsFormat = async (formatId: string, data: unknown) => {
    try {
      const response = await settingServices.updateExportFieldsFormat(
        formatId,
        data
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const uploadPoData = async (data: unknown) => {
    try {
      const formData = new FormData();
      formData.append("excelFile", data as File, "po-dataset.xlsx");
      const response = await settingServices.uploadPoData(formData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const postInvoiceRules = async (data: unknown) => {
    try {
      const response = await settingServices.postInvoiceRules(data);
      console.log(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getInvoiceRules = async () => {
    try {
      const response = await settingServices.getInvoiceRules();
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const updateInvoiceRulesStatus = async (ruleId: string, data: unknown) => {
    try {
      const response = await settingServices.updateInvoiceRuleStatus(
        ruleId,
        data
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteInvoiceRules = async (ruleId: string) => {
    try{
      const response = await settingServices.deleteInvoiceRules(ruleId)
      console.log(response)
    }catch(error){
      console.log(error)
      throw error
    }
  }

  return (
    <SettingContext.Provider
      value={{
        uploadPoData,
        changePassword,
        errorMessage,
        changeUserData,
        createInvoiceExportFormat,
        getInvoiceFormatExport,
        selectExportFormat,
        updateExportFieldsFormat,
        postInvoiceRulesMutation,
        getInvoiceRules,
        updateInvoiceRulesMutation,
        deleteInvoiceRulesMutation
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export const useSetting = (): SettingContextTypes => {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("use useSetting inside Setting Provider");
  }
  return context;
};
