"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  MoreHorizontal,
  PlusCircle,
  FilePenLine,
  Trash2,
  Search,
  CalendarPlus,
  BookPlus,
} from "lucide-react";

import type { Outreach } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { OutreachForm } from "./outreach-form";

type OutreachTableProps = {
  records: Outreach[];
};

type FormMode = "schedule" | "log" | "edit";

export default function OutreachTable({
  records: initialRecords,
}: OutreachTableProps) {
  const [records, setRecords] = React.useState<Outreach[]>(initialRecords);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingRecord, setEditingRecord] = React.useState<Outreach | null>(null);
  const [formMode, setFormMode] = React.useState<FormMode>("log");

  const filteredRecords = React.useMemo(() => {
    if (!searchTerm) return records;
    return records.filter(
      (record) =>
        record.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [records, searchTerm]);

  const handleOpenForm = (mode: FormMode, record: Outreach | null = null) => {
    setFormMode(mode);
    setEditingRecord(record);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  const handleSave = (data: Omit<Outreach, "id" | "status"> & { id?: string }) => {
    const status: Outreach['status'] = new Date(data.scheduledAt) > new Date() ? 'Scheduled' : 'Completed';
    if (editingRecord) {
      // Update existing record
      const updatedRecord = { ...editingRecord, ...data, status };
      setRecords((prev) =>
        prev.map((r) => (r.id === updatedRecord.id ? updatedRecord : r))
      );
    } else {
      // Add new record
      const newRecord: Outreach = {
        id: (records.length + 1).toString(),
        ...data,
        status,
      };
      setRecords((prev) => [newRecord, ...prev]);
    }
    setIsFormOpen(false);
    setEditingRecord(null);
  };

  const getBadgeVariant = (status: Outreach["status"]) => {
    switch (status) {
      case "Completed":
        return "secondary";
      case "Scheduled":
        return "default";
      case "Cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };
  
  const getDialogTitle = () => {
    switch(formMode) {
      case 'edit': return "Edit Outreach";
      case 'schedule': return "Schedule New Outreach";
      case 'log': return "Log New Outreach";
    }
  }

  const getDialogDescription = () => {
     switch(formMode) {
      case 'edit': return "Update the details of this outreach activity.";
      case 'schedule': return "Schedule a future outreach activity.";
      case 'log': return "Log a new outreach activity that has already happened.";
    }
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by institution, contact, or topic..."
            className="pl-8 sm:w-full md:w-[300px] lg:w-[400px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
           <Button onClick={() => handleOpenForm('schedule')} className="gap-1">
            <CalendarPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Schedule Outreach</span>
          </Button>
          <Button onClick={() => handleOpenForm('log')} className="gap-1" variant="secondary">
            <BookPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Log Outreach</span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Outreach Logs</CardTitle>
          <CardDescription>
            A shared record of all company outreach activities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Institution</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {record.institution}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {record.contactPerson}
                    </TableCell>
                    <TableCell>{record.topic}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {format(new Date(record.scheduledAt), "PPP")}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={getBadgeVariant(record.status)}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleOpenForm('edit', record)}>
                            <FilePenLine className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(record.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {getDialogTitle()}
            </DialogTitle>
            <DialogDescription>
              {getDialogDescription()}
            </DialogDescription>
          </DialogHeader>
          <OutreachForm
            key={editingRecord?.id || formMode}
            outreach={editingRecord}
            onSave={handleSave}
            onCancel={() => setIsFormOpen(false)}
            mode={formMode}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
