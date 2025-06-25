import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBlockRequests, useUpdateBlockRequestStatus } from "@/hooks/use-block-requests-api";
import { Clock, Shield, AlertTriangle, CheckCircle } from "lucide-react";

export default function BlockRequestsScreen() {
  const { data: blockRequests, isLoading } = useBlockRequests();
  const updateStatus = useUpdateBlockRequestStatus();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <AlertTriangle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "processing":
        return "default";
      case "completed":
        return "default";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "destructive";
      case "high":
        return "destructive";
      case "normal":
        return "default";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      await updateStatus.mutateAsync({ id, status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Cargando solicitudes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" style={{ fontFamily: 'Barlow, sans-serif' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Solicitudes de Bloqueo</h1>
          <p className="text-gray-600">Gestión y seguimiento de solicitudes de bloqueo de productos bancarios</p>
        </div>

        <div className="grid gap-6">
          {blockRequests?.map((request) => {
            const products = JSON.parse(request.selectedProducts);
            
            return (
              <Card key={request.id} className="shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getStatusIcon(request.status)}
                      Solicitud #{request.id}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                      <Badge variant={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Información del Usuario</h4>
                      <p className="text-sm text-gray-600">DNI: {request.userId}</p>
                      <p className="text-sm text-gray-600">Tipo: {request.requestType}</p>
                      {request.reason && (
                        <p className="text-sm text-gray-600">Motivo: {request.reason}</p>
                      )}
                      <p className="text-sm text-gray-600">
                        Creado: {new Date(request.createdAt).toLocaleString('es-PE')}
                      </p>
                      {request.processedAt && (
                        <p className="text-sm text-gray-600">
                          Procesado: {new Date(request.processedAt).toLocaleString('es-PE')}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Productos Seleccionados</h4>
                      <div className="space-y-2">
                        {products.map((product: any, index: number) => (
                          <div key={index} className="bg-gray-100 p-2 rounded text-sm">
                            <span className="font-medium">{product.bank}</span> - {product.product}
                            <Badge variant="outline" className="ml-2 text-xs">
                              {product.productType}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Cambiar estado:</span>
                      <Select 
                        onValueChange={(value) => handleStatusUpdate(request.id, value)}
                        defaultValue={request.status}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendiente</SelectItem>
                          <SelectItem value="processing">Procesando</SelectItem>
                          <SelectItem value="completed">Completado</SelectItem>
                          <SelectItem value="failed">Fallido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {!blockRequests || blockRequests.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay solicitudes</h3>
              <p className="text-gray-600">No se encontraron solicitudes de bloqueo.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}